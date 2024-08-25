import { unstable_usePrompt } from "react-router-dom";

export default function () {
  unstable_usePrompt({
    message: "尚未儲存，確定要離開嗎?",
    when: ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname &&
      !window.passLeavePrompt,
  });
}
