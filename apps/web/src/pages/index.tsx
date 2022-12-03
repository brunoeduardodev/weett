import { Button } from "ui";
import { Feed } from "../components/Feed";
import { trpc } from "../utils/trpc";

export default function Web() {
  return (
    <div>
      <Feed />
    </div>
  );
}
