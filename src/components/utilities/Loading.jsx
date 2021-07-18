import { useLoading, ThreeDots } from '@agney/react-loading';

const Loading = ({ page }) => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="50" />,
  });

  return (
    <section
      {...containerProps}
      className={`loading ${page === 'home' ? 'home' : 'details'}`}
    >
      {indicatorEl}
    </section>
  );
};

export default Loading;
