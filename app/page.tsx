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
        <div className='cost_sanity_check_zone'>
          <Link href="/NB_cost_sanity_check" className='link'>
            <Button className='cost_sanity_check_btn'> 
              Notebook Cost Sanity Check
            </Button>
          </Link>
        </div>
        <div className='other_function1'>
          <Link href="/DT_cost_sanity_check" className='link'>
            <Button className='cost_sanity_check_btn' >
              Desktop Cost Sanity Check
            </Button>
          </Link>
        </div>
        <div className='other_function2'>
          <Link href="/RAG"className='link'>
            <Button className='cost_sanity_check_btn' >
            Cost team GPT
            </Button>
          </Link>
        </div>
      </div>

      <div className='function_zone2'>
        <div className='other_function3'>
          <Link href="/DB" className='link'>
            <Button className='cost_sanity_check_btn'> 
            DB
            </Button>
          </Link>
        </div>
        <div className='other_function4'>
          <Link href="/" className='link'>
            <Button className='cost_sanity_check_btn' >
            waited to dev
            </Button>
          </Link>
        </div>
        <div className='other_function5'>
          <Link href="/"className='link'>
            <Button className='cost_sanity_check_btn' >
              waited to dev
            </Button>
          </Link>
        </div>
      </div>
    </div>
    
  );
}
