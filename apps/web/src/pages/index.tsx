import { Button } from "ui";
import { trpc } from "../utils/trpc";

export default function Web() {
  const { data, isLoading, error } = trpc.health.useQuery();

  console.log({ data, isLoading, error });

  return (
    <div>
      <h1>Web</h1>
      <Button />
    </div>
  );
}
