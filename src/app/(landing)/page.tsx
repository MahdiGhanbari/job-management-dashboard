import { redirect } from "next/navigation";
export default function Home() {
  redirect("/dashboard");
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
