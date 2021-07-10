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
        // textAlign: 'center',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '3rem',
      }}
    >
      {indicatorEl}
    </section>
  );
};

export default Loading;
