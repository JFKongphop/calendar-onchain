import type { FC } from 'react';

interface IAddressCard {
  address: string;
  onPrepareAddress: (address: string) => void;
} 

const AddressCard: FC<IAddressCard> = ({
  address,
  onPrepareAddress
}) => {
  return (
    <div 
      className="border-2 border-calendar-main-theme text-[10px] font-medium rounded-sm active:bg-calendar-minor-theme cursor-pointer text-center"
      onClick={() => onPrepareAddress(address)}
    >
      {address}
    </div>
  )
}

export default AddressCard;