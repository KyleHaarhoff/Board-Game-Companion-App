import { file } from "../general/files";
import { commentDto  } from "./commentDto";

export interface scriptDto{
    name: string;
    author: string;
    boardgame: string;
    created: Date;
    published: Date;
    downloads: number;
    lastdownload: Date;
    public: boolean;
    export: boolean;
    size: number;
    comments: commentDto[];
    files: file[];
    icon: string;
};