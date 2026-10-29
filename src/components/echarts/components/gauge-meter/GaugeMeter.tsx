import GaugeMeterEngine from './engine/GaugeMeterEngine';
import type { GaugeMeterProps } from './GaugeMeter.types';

const GaugeMeter = (props: GaugeMeterProps) => {
  return <GaugeMeterEngine {...props} />;
};

export default GaugeMeter;
