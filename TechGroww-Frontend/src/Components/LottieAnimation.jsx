import Lottie from 'lottie-react';

export default function LottieAnimation({ animationData, className = "" }) {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}