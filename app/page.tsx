import '../styles/main.css';
import Link from "next/link";
import Button from '@mui/material/Button';
import Head from 'next/head';

export default function Home() {
  return (
    
    <div className='main_page'>
      <title>Cost team web</title>
      <div className='title_zone'>
        <h1>COST TEAMS WEB</h1>
      </div>

      <div className='function_zone1'>
      <Link href="/NB_cost_sanity_check" className='cost_sanity_check_zone'>
          <Button className='cost_sanity_check_btn'>
            Notebook Cost Sanity Check
          </Button>
        </Link>
        <Link href="/DT_cost_sanity_check" className='other_function1'>
          <Button className='cost_sanity_check_btn' >
            Desktop Cost Sanity Check
          </Button>
        </Link>
        <Link href="/cost_sanity_check"className='other_function2'>
          <Button className='cost_sanity_check_btn' >
            waited to dev
          </Button>
        </Link>
      </div>

      <div className='function_zone2'>
        <Link href="/cost_sanity_check"className='other_function3'>
          <Button className='cost_sanity_check_btn' >
            waited to dev
          </Button>
        </Link>
        <Link href="/cost_sanity_check" className='other_function4'>
          <Button className='cost_sanity_check_btn' >
            waited to dev
          </Button>
        </Link>
        <Link href="/cost_sanity_check" className='other_function5'>
          <Button className='cost_sanity_check_btn'>
            waited to dev
          </Button>
        </Link>
      </div>
    </div>
    
  );
}
