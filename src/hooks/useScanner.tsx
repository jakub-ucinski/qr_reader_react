import { UseScanner } from "interfaces";
import QrScanner from "qr-scanner";
import { useEffect } from "react";

const useScanner: UseScanner = (
  vid,
  {
    onResult = (result) => console.log(result),
    color = "both",
    maxScansPerSecond = 1,
    onError = (error) => console.log(error),
  }
) => {
  const inversion =
    (color && color === "dark" && "original") ||
    (color && color === "light" && "invert") ||
    "both";

  useEffect(() => {
    let qrScanner: QrScanner | null = null;
    
    if (vid.current) {
      qrScanner = new QrScanner(
        vid.current,
        onResult,
        {
          onDecodeError: onError,
          maxScansPerSecond,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      if (!QrScanner.hasCamera()) {
        console.log("No Camera");
      }
      qrScanner.setInversionMode(inversion);
      qrScanner.start();
    }

    return () => {
      qrScanner && qrScanner.stop();
      qrScanner && qrScanner.destroy();
      qrScanner = null;
    };
  }, [vid.current]);
};

export default useScanner;
