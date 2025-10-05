import arcjet from "@arcjet/next";
import { shield } from "@arcjet/next";      

export default arcjet({
    key: process.env.ARCJET_KEY!,

    characteristics: ["fingerprint"],   

    rules: [
        shield({
            mode: "LIVE",
        })
    ]       
})