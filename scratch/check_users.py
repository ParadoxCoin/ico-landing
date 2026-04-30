import os
import asyncio
from supabase import create_client
from dotenv import load_dotenv

load_dotenv('Zex/backend/.env')

url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

async def main():
    supabase = create_client(url, key)
    user_id = "5c8cd695-942b-407d-b59f-71d29b06cdfd"
    try:
        credits = supabase.table('user_credits').select('credits_balance').eq('user_id', user_id).execute()
        print(f"DEBUG_CREDITS: {credits.data}")
    except Exception as e:
        print(f"DEBUG_ERROR: {e}")

if __name__ == "__main__":
    asyncio.run(main())
