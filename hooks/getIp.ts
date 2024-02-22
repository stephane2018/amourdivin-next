import { useEffect, useState } from "react";

export default function getIPAddress() {
  return new Promise((resolve, reject) => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch IP address");
        }
        return response.json();
      })
      .then((data) => {
        const { ip } = data;
        resolve(`${ip}`);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
