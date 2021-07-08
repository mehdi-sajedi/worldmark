import { useLoading, ThreeDots } from '@agney/react-loading';

const Loading = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="50" />,
  });

  return (
    <section
      {...containerProps}
      style={{
        textAlign: 'center',
        marginTop: '3rem',
      }}
    >
      {indicatorEl}
    </section>
  );
};

export default Loading;
