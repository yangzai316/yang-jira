import { SmileOutlined, MehOutlined } from '@ant-design/icons';

interface collectionProps {
  
  is: boolean;
  onChange: (value?: number) => void;
}

export const Collection = (props: collectionProps) => {
  const { is, onChange } = props;
  return (
    <div
      onClick={() => {
        onChange();
      }}
    >
      {is ? <SmileOutlined /> : <MehOutlined />}
    </div>
  );
};
