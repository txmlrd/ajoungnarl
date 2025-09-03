import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "../components/Button";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center lg:h-[80vh] h-[100vh]">
      <DotLottieReact src="https://lottie.host/5a5f4dd2-8f5b-44a2-b1aa-aba5ef4f7b1e/rhTS8UCZka.lottie" loop autoplay />
      <Button text={"Back to Home"} path={"/"} />
    </div>
  );
}
