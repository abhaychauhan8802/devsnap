import { useMediaQuery } from "react-responsive";

const useBreakPoints = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isMid = useMediaQuery({ maxWidth: 768 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return { isMobile, isDesktop, isMid };
};

export default useBreakPoints;
