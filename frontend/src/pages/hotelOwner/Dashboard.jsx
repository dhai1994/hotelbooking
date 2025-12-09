import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { currency, user, getToken, axios, setShowHotelReg } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setErr(null);
    try {
      const token = await getToken();
      if (!token) {
        const m = 'Not authenticated';
        toast.error(m);
        setErr(m);
        return;
      }

      const { data } = await axios.get('/api/bookings/hotel', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Accept: 'application/json',
        },
        params: { _ts: Date.now() }, // cache-buster to avoid 304/no-body
      });

      if (data?.success === true) {
        const d = data.dashboardData ?? {};
        setDashboardData({
          bookings: Array.isArray(d.bookings) ? d.bookings : [],
          totalBookings: d.totalBookings ?? 0,
          totalRevenue: d.totalRevenue ?? 0,
        });
      } else {
        const m = data?.message ?? 'Request failed';
        if (m === 'No Hotel found') {
          setShowHotelReg?.(true); // open register-hotel modal if available
        } else {
          toast.error(m);
        }
        setErr(m);
      }
    } catch (error) {
      const status = error?.response?.status;
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Something went wrong';
      const final = `${status ? status + ' ' : ''}${msg}`;
      toast.error(final);
      setErr(final);
      console.error('Dashboard API error:', {
        status,
        url: error?.config?.url,
        data: error?.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user || cancelled) return;
      await fetchDashboardData();
    })();
    return () => {
      cancelled = true;
    };
  }, [user]); // re-run when auth/user becomes available

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      {loading && (
        <div className="mb-3 text-sm text-gray-500">Loading dashboard…</div>
      )}
      {err && (
        <div className="mb-4 rounded bg-red-50 text-red-700 p-3">
          Error: {err}
        </div>
      )}

      <div className="flex gap-4 my-8">
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img src={assets.totalBookingIcon} alt="" className="max-sm:hidden h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">{dashboardData.totalBookings}</p>
          </div>
        </div>

        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img src={assets.totalRevenueIcon} alt="" className="max-sm:hidden h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">
              {currency}{dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl text-blue-950/70 font-medium mb-5">Recent Bookings</h2>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Room Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Total Amount</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Payment Status</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {dashboardData.bookings.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                  No recent bookings.
                </td>
              </tr>
            )}

            {dashboardData.bookings.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item?.user?.username ?? '—'}
                </td>

                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item?.room?.roomType ?? '—'}
                </td>

                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  {currency}{item?.totalPrice ?? 0}
                </td>

                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <button
                    className={`py-1 px-3 text-xs rounded-full ${
                      item?.isPaid ? 'bg-green-200 text-green-600' : 'bg-amber-200 text-yellow-600'
                    }`}
                  >
                    {item?.isPaid ? 'Completed' : 'Pending'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
