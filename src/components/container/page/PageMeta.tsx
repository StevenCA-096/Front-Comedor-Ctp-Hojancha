import { Helmet } from 'react-helmet';

interface PageMetaProps {
  title?: string; 
  description: string; 
}

const PageMeta = ({ title, description }: PageMetaProps) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  </div>
);


export default PageMeta;

