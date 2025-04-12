/* eslint-disable perfectionist/sort-imports */
import '@/utils/highlight';
// markdown plugins
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import { Link as MuiLink } from '@mui/material';

import StyledMarkdown from './styles';
import Link from 'next/link';

// ----------------------------------------------------------------------

export default function Markdown({ sx, children, ...other }: { sx?: any, children: any }) {
  return (
    <StyledMarkdown sx={sx}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight, [remarkGfm, { singleTilde: false }]]}
        components={components}
        {...other}
      >{children}</ReactMarkdown>
    </StyledMarkdown>
  );
}

// ----------------------------------------------------------------------

const components = {
  img: ({ ...props }) => <img
        alt={props.alt} 
        className='rounded-md aspect-video'
        {...props} 
    />,
  a: ({ ...props }) => {
    const isHttp = props.href.includes('http');

    return isHttp ? (
      <MuiLink target="_blank" rel="noopener" {...props} />
    ) : (
      <MuiLink component={Link} href={props.href} {...props}>
        {props.children}
      </MuiLink>
    );
  },
};