interface ModalFieldProps {
   label?: string;
   value: string | number | React.ReactNode;
}

const ModalField = ({ label, value }: ModalFieldProps) => {
   return (
      <p className='flex items-center space-x-2 text-neutral-600'>
         {label && <span className='dark:text-neutral-300'>{label}: </span>}
         <span className='font-light dark:text-neutral-400'>{value}</span>
      </p>
   );
};

export default ModalField;
