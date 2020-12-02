import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";

import { getSortedPostsData } from "../lib/posts";

import utilStyles from "../styles/utils.module.css";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: { allPostsData },
    };
}

const Home = ({ allPostsData }) => (
    <Layout home>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
            <p>
                Hi there! I'm Ricardo and I am a software developer. I try to
                keep learning and to allways keep evolving. For the momment I'm
                interested in learning Next.js
            </p>
            <p>
                (This is a sample website - you’ll be building a site like this
                on <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
            </p>
        </section>

        <section className={`${utilStyles.headingMD} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul className={utilStyles.list}>
                {allPostsData.map(({ id, date, title }) => (
                    <li className={utilStyles.listItem} key={id}>
                        <Link href={`/posts/${id}`}>
                            <a>{title}</a>
                        </Link>
                        <br />

                        <smal className={utilStyles.lightText}>
                            <Date dateString={date} />
                        </smal>
                    </li>
                ))}
            </ul>
        </section>
    </Layout>
);

export default Home;
