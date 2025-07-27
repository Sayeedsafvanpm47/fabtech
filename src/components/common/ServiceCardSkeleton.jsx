import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  height: 450px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(7, 7, 7, 0.1);
  box-shadow: 0 8px 32px rgba(2, 4, 36, 0.2);
`;

const ImageSkeleton = styled.div`
  height: 200px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
`;

const ContentSkeleton = styled.div`
  padding: 1.5rem;
`;

const TitleSkeleton = styled.div`
  height: 24px;
  width: 60%;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const TextSkeleton = styled.div`
  height: 16px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  border-radius: 4px;
  margin-bottom: 0.8rem;

  &:last-of-type {
    width: 80%;
  }
`;

const ButtonSkeleton = styled.div`
  height: 40px;
  width: 120px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  border-radius: 5px;
  margin-top: 1rem;
`;

const ServiceCardSkeleton = () => {
  return (
    <Card>
      <ImageSkeleton />
      <ContentSkeleton>
        <TitleSkeleton />
        <TextSkeleton style={{ width: '100%' }} />
        <TextSkeleton style={{ width: '90%' }} />
        <TextSkeleton style={{ width: '95%' }} />
        <TextSkeleton style={{ width: '85%' }} />
        <ButtonSkeleton />
      </ContentSkeleton>
    </Card>
  );
};

export default ServiceCardSkeleton; 