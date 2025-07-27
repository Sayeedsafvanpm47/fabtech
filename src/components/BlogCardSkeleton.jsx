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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
`;

const ImageSkeleton = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const MetaSkeleton = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  div {
    height: 16px;
    width: 100px;
    background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
    background-size: 2000px 100%;
    animation: ${shimmer} 1.5s linear infinite;
    border-radius: 4px;
  }
`;

const TitleSkeleton = styled.div`
  height: 24px;
  width: 80%;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const TextSkeleton = styled.div`
  height: 16px;
  width: 100%;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  border-radius: 4px;
  margin-bottom: 0.8rem;

  &:last-of-type {
    width: 60%;
  }
`;

const BlogCardSkeleton = () => {
  return (
    <Card>
      <ImageSkeleton />
      <Content>
        <MetaSkeleton>
          <div />
          <div />
        </MetaSkeleton>
        <TitleSkeleton />
        <TextSkeleton />
        <TextSkeleton />
        <TextSkeleton />
      </Content>
    </Card>
  );
};

export default BlogCardSkeleton; 