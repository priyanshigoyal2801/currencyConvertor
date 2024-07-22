import { useState, useEffect } from 'react';
import { Inputbox } from './components';
import useCurrencyInfo from './hooks/usecurrencyInfo';
import './App.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);

  useEffect(() => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  }, [amount, to, currencyInfo]);

  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat overflow-x-hidden' style={{ backgroundImage: `url('https://media.istockphoto.com/id/1264887364/photo/coin-stacks-sitting-on-a-blue-financial-graph-background.jpg?s=1024x1024&w=is&k=20&c=LibXd6xnEbk6RrLDgklZg5Siy8-YkmlCZ1YMR66rmaU=')` }}>
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
          <form onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}>
            <div className='w-full mt-1 mb-1'> 
              <Inputbox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={setFrom}
                selectCurrency={from}
                onAmountChange={setAmount}
              />
            </div>
            <div className='relative w-full h-0.5'>
              <button type="button" className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5' onClick={swap}>
                Swap
              </button>
            </div>
            <div className='w-full mt-1 mb-4'>
              <Inputbox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={setTo}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type="submit" className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'>
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
