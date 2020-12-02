import fs from "fs";
import path from "path";

import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = () => {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((f) => {
        const id = f.replace(/\.md$/, "");

        const fullPath = path.join(postsDirectory, f);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    });

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) return 1;
        else return -1;
    });
};

export const getAllPostIds = () => {
    const fileNames = fs.readdirSync(postsDirectory);
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]

    return fileNames.map((f) => ({
        params: {
            id: f.replace(/\.md$/, ""),
        },
    }));
};

export const getPostData = async (id) => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    // Combine the data with the id
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
};
