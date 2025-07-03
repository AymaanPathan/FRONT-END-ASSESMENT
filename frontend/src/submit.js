// submit.js
import { Button } from "./components/ui/button";

export const SubmitButton = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button variant="default">Click me</Button>
    </div>
  );
};
