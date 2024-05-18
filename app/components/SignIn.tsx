"use client"
import { supabase } from '@/lib/supabase/database';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';

function SignIn() {
  return ( 
    <div className="fixed top-0 bg-white h-[100%] w-[100%] flex items-center content-center">
      <div className='md:w-[25%] m-auto'>
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['github']}
          />
      </div>
    </div>
   );
}

export default SignIn;