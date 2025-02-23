import { Canvas, Points, vec } from '@shopify/react-native-skia';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

const meta = {
  component: () => null,
};

export default meta;

const defaultPoints = [
  vec(128, 0),
  vec(168, 80),
  vec(256, 93),
  vec(192, 155),
  vec(207, 244),
  vec(128, 202),
  vec(49, 244),
  vec(64, 155),
  vec(0, 93),
  vec(88, 80),
  vec(128, 0),
];
export const PointsAnimation = () => {
  const lastIndex = useSharedValue(defaultPoints.length - 1);
  const points = useDerivedValue(() => {
    const points = defaultPoints.map((point) => vec(point.x + 20, point.y + 20));
    const moveStartIndex = Math.ceil(lastIndex.value);
    const moveEndPointIndex = Math.floor(lastIndex.value);
    const startPoint = points[moveStartIndex];
    const endPoint = points[moveEndPointIndex];
    const diff = moveStartIndex - lastIndex.value;
    if (diff === 0) {
      // sliceのendを指定するので+1
      return points.slice(0, moveStartIndex + 1);
    }
    return [
      ...points.slice(0, moveEndPointIndex + 1),
      vec(startPoint.x + (endPoint.x - startPoint.x) * diff, startPoint.y + (endPoint.y - startPoint.y) * diff),
    ];
  }, [lastIndex]);

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => {
          lastIndex.value = withTiming(lastIndex.value - 1);
        }}
        style={{ padding: 16 }}
      >
        <Text>押すと頂点が１つ消える</Text>
      </Pressable>
      <Canvas style={{ flex: 1 }}>
        <Points points={points} mode="polygon" color="lightblue" style="stroke" strokeWidth={4} />
        <Points points={points} mode="points" color="red" strokeCap="round" strokeWidth={12} />
      </Canvas>
    </View>
  );
};

const data = [
  { weight: 70, date: '2021-01-01' },
  { weight: 74, date: '2021-01-02' },
  { weight: 72, date: '2021-01-03' },
  { weight: 73, date: '2021-01-04' },
  { weight: 71, date: '2021-01-05' },
  { weight: 70, date: '2021-01-06' },
  { weight: 69, date: '2021-01-07' },
  { weight: 68, date: '2021-01-08' },
  { weight: 67, date: '2021-01-09' },
  { weight: 66, date: '2021-01-10' },
];
const orginalWeightRange = data.reduce(
  (acc, cur) => {
    return [Math.min(acc[0], cur.weight - 10), Math.max(acc[1], cur.weight + 10)];
  },
  [0, 0],
);

export const Camera = () => {
  const dim = useWindowDimensions();
  const canvasArea = [dim.width, 300];
  const drawingVerteces = [20, 20, canvasArea[0] - 20, canvasArea[1] - 20];
  const dateRange = useSharedValue([0, data.length - 1]);
  const weightRange = useSharedValue(orginalWeightRange);
  const points = useDerivedValue(() => {
    // drawingVerteces[0]を起点にして、xが大きくなるような実装(比率使ってるせい？)なので、絶対値的な計算にしたい
    const getXPoint = (dateDiff: number, diff: number) => {
      return drawingVerteces[0] + (diff / dateDiff) * (drawingVerteces[2] - drawingVerteces[0]);
    };
    const getYPoint = (weightDiff: number, diff: number) => {
      return drawingVerteces[3] - (diff / weightDiff) * (drawingVerteces[3] - drawingVerteces[1]);
    };
    const leftMoveIndex = Math.floor(dateRange.value[0]);
    const leftEndPointIndex = Math.ceil(dateRange.value[0]);
    const rightMoveIndex = Math.ceil(dateRange.value[1]);
    const rightEndPointIndex = Math.floor(dateRange.value[1]);
    const leftMovePoint = data[leftMoveIndex];
    const leftEndPoint = data[leftEndPointIndex];
    const rightEndPoint = data[rightEndPointIndex];
    const points = [];
    const leftDiff = leftMoveIndex - dateRange.value[0];
    const rightDiff = rightMoveIndex - dateRange.value[1];
    const dateDiff = dateRange.value[1] - dateRange.value[0];
    const weightDiff = weightRange.value[1] - weightRange.value[0];
    if (leftDiff === 0 && rightDiff === 0) {
      return data
        .slice(leftEndPointIndex, rightEndPointIndex + 1)
        .map((d, i) => vec(getXPoint(dateDiff, i), getYPoint(weightDiff, d.weight - weightRange.value[0])));
    }
    if (leftDiff !== 0) {
      points.push(
        vec(
          getXPoint(dateDiff, leftMoveIndex - dateRange.value[0]),
          getYPoint(weightDiff, leftEndPoint.weight - weightRange.value[0]),
        ),
      );
    }
    points.push(
      ...data
        .slice(leftEndPointIndex, rightEndPointIndex + 1)
        .map((d, i) => vec(getXPoint(dateDiff, i), getYPoint(weightDiff, d.weight - weightRange.value[0]))),
    );
    if (rightDiff !== 0) {
      vec(getXPoint(dateDiff, rightMoveIndex), getYPoint(weightDiff, rightEndPoint.weight - weightRange.value[0]));
    }
    return points;
  }, [dateRange, dim, weightRange]);

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => {
          dateRange.value = withTiming([dateRange.value[0] + 1, dateRange.value[1]]);
        }}
        style={{ padding: 16 }}
      >
        <Text>押すと頂点が１つ消える</Text>
      </Pressable>
      <Canvas style={{ width: canvasArea[0], height: canvasArea[1] }}>
        <Points points={points} mode="polygon" color="lightblue" style="stroke" strokeWidth={4} />
        <Points points={points} mode="points" color="red" strokeCap="round" strokeWidth={12} />
      </Canvas>
    </View>
  );
};
