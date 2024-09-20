"use client";
import { FaUser } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import styles from "./page.module.scss";

export default function AltImage({ url }) {
  console.log(url);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    // const img = new Image();
    // img.src = url;
    // img.onload = () => setLoading(false);
    // img.onerror = () => {
    //   setLoading(false);
    //   setHasError(true);
    // };
  }, [url]);
  return (
    <div>
      {isLoading ? <p>loading</p> : hasError ? <p>error</p> : <img src={url} />}
    </div>
  );
}
