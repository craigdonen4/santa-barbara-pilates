import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";

const components: MDXRemoteProps["components"] = {};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-editorial">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
