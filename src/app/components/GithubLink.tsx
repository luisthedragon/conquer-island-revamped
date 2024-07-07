"use client"
import { PiGithubLogo } from "react-icons/pi";

export default function githubLink() {
    return (
        <a className="flex gap-2 align-middle bg-slate-500 hover:bg-slate-600 justify-center border border-white rounded p-2" href="https://github.com/luisthedragon/conquer-island-revamped">
            <PiGithubLogo className="m-auto" size={20} />
            <h1 className="m-auto">Get the source code</h1>
        </a>
    )
}
