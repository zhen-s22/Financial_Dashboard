import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

// 👇 Export a GET route so visiting /query works
export async function GET() {
  try {
    const invoices = await listInvoices();
    return Response.json(invoices);  // send result back as JSON
  } catch (error) {
    console.error('Database query failed:', error);
    return new Response('Error fetching invoices', { status: 500 });
  }
}
