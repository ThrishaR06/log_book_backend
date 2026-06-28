import Redis from "ioredis";

export const redis = new Redis({
    host: "127.0.0.1",
    port: 3306,
});

redis.on("connect", () => {
    console.log("Redis Connected");
});

redis.on("error", (err) => {
    console.log(err);
});