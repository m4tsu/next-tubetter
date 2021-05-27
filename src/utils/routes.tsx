import React from 'react';
import Link, { LinkProps } from 'next/link';
import { ReactElement, ReactNode } from 'react';
import qs from 'query-string';

// ----------------

export const Paths = {
  videos: '/[userId]/videos',
  video: '/[userId]/videos/[videoId]',
  top: '/',
  signin: '/signin',
} as const;

// 参考 https://zenn.dev/panda_program/articles/typescript-nextjs-routing

export type PathKey = keyof typeof Paths;
export type Path = typeof Paths[PathKey];

type WithoutSlash<T> = T extends `/${infer U}` ? U : never;
type Resource<T> = T extends `${infer U}/${infer S}` ? U | Resource<S> : T;
type DynamicRoute<T> = T extends `[${infer U}]` ? U : never;

type Params<T> = DynamicRoute<Resource<WithoutSlash<T>>>;
type ParamKeys<T extends Path> = Params<T>;

type PathParams<T extends Path> = {
  path: T;
  params?: { [K in ParamKeys<T>]: string | number };
};
export type Args<T extends Path> = ParamKeys<T> extends never
  ? PathParams<T>
  : Required<PathParams<T>>;

export const getPath = <T extends Path>({ path, params }: Args<T>) => {
  if (!params) {
    return path;
  }

  return path
    .split('/')
    .map((str) => {
      const match = str.match(/\[(.*?)\]/);
      if (match) {
        const key = match[0];
        const trimmed = key.substring(1, key.length - 1) as ParamKeys<
          typeof path
        >;
        return params[trimmed];
      }

      return str;
    })
    .join('/');
};

type Props<T extends Path> = {
  query?: { [key: string]: string | number | string[] };
  hash?: string;
} & Args<T> &
  Omit<LinkProps, 'href'>;

const TypedLink: <T extends Path>(
  props: Args<T> & {
    children?: ReactNode;
    className?: string;
    query?: { [key: string]: string | number | string[] };
    hash?: string;
  } & Omit<LinkProps, 'href'>
) => ReactElement = (props) => {
  // let path: string;
  // if (!params) {
  //   path = rest.path;
  // } else {
  //   path = rest.path
  //     .split('/')
  //     .map((str) => {
  //       const match = str.match(/\[(.*?)\]/);
  //       if (match) {
  //         const key = match[0];
  //         const trimed = key.substring(1, key.length - 1) as ParamKeys<
  //           typeof rest.path
  //         >;
  //         return params[trimed];
  //       }
  //       return str;
  //     })
  //     .join('/');
  // }
  const path = getPath(props);

  const query = props.query ? `?${qs.stringify(props.query)}` : '';
  const hash = props.hash ? `#${props.hash}` : '';
  const href = path + query + hash;
  const { className, children, ...linkProps } = props;
  return (
    <Link href={href} {...linkProps}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={className}>{children}</a>
    </Link>
  );
};

export { TypedLink as Link };
