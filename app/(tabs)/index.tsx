import { Image, Text, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Button } from 'tamagui';
import { db } from '@/db';
import { type Weight, weights, type InsertWeight } from '@/db/schema';
import { useState } from 'react';
import { ulid } from '@/lib/ulid';
import { desc, gte } from 'drizzle-orm';

export default function HomeScreen() {
  const [weight, setWeight] = useState<Weight[] | null>(null);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.reactLogo} />}
    >
      <Button
        theme="blue"
        onPress={async () => {
          console.log('Inserting weight');
          try {
            const result = await db
              .select()
              .from(weights)
              .where(gte(weights.createdAt, '2025-02-11 11:10:04'))
              .orderBy(desc(weights.createdAt));
            setWeight(result);
            console.log(result);
          } catch (e) {
            console.log('Error inserting weight', e);
          }
        }}
      >
        Hello world
      </Button>
      <Text>{weight ? `Weight: ${JSON.stringify(weight, undefined, 2)}` : 'No weight'}</Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
