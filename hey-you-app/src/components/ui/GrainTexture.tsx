import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

/**
 * Grain texture overlay for watercolor aesthetic
 * Applied to background canvas
 */
export const GrainTexture: React.FC = () => {
  return (
    <View style={styles.container} pointerEvents="none">
      {/* Using a subtle noise pattern via gradient simulation */}
      {/* In production, replace with actual grain texture PNG */}
      <View style={styles.grain} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    pointerEvents: 'none',
  },
  grain: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    // Note: For actual grain effect, use an Image with a tileable noise texture
    // Example:
    // <Image
    //   source={require('../assets/grain-texture.png')}
    //   style={{ width: '100%', height: '100%', opacity: 0.05 }}
    //   resizeMode="repeat"
    // />
  },
});

export default GrainTexture;
