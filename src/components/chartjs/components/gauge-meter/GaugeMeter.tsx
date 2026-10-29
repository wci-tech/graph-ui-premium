/** @jsxImportSource @emotion/react */

import GaugeMeterEngine from './engine/GaugeMeterEngine';
import type { GaugeMeterProps } from './GaugeMeter.types';

export const GaugeMeter = (props: GaugeMeterProps) => {
  return <GaugeMeterEngine {...props} />;
};

export default GaugeMeter;
