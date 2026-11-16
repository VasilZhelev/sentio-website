import { notFound } from "next/navigation";

/** Unknown paths land here so the 404 page renders inside the site layout */
export default function CatchAll() {
  notFound();
}
