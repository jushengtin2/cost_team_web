import '../styles/main.css';
import Link from "next/link";
import Button from '@mui/material/Button';


export default function Home() {
  return (
    <div className='main_page'>

      <div className='title_zone'>
        <h1>COST TEAMS WEB</h1>
      </div>

      <div className='function_zone1'>
        <div className='cost_sanity_check_zone'>
          <Button className='cost_sanity_check_btn'>
            <Link href="/cost_sanity_check">Notebook Cost Sanity Check</Link>
          </Button>
        </div>
        <div className='other_function1'>
          <Button className='cost_sanity_check_btn' >
            <Link href="/cost_sanity_check">Desktop Cost Sanity Check</Link>
          </Button>
        </div>
        <div className='other_function2'>
          <Button className='cost_sanity_check_btn' >
            <Link href="/cost_sanity_check">waited to dev</Link>
          </Button>
        </div>
      </div>

      <div className='function_zone2'>
        <div className='other_function3'>
          <Button className='cost_sanity_check_btn' >
            <Link href="/cost_sanity_check">waited to dev</Link>
          </Button>
        </div>
        <div className='other_function4'>
          <Button className='cost_sanity_check_btn' >
            <Link href="/cost_sanity_check">waited to dev</Link>
          </Button>
        </div>
        <div className='other_function5'>
          <Button className='cost_sanity_check_btn'>
            <Link href="/cost_sanity_check">waited to dev</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
