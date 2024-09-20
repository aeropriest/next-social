import { useRouter } from "next/router";

import React from "react";

export default function Feed() {
  console.log("in the slug");
  const router = useRouter();
  const { slug } = router.query;
  return <div>{slug}</div>;
}
