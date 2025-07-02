import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// 👇 شكل config لكل خط
// {
//   key: 'onTime',
//   label: 'On Time',
//   color: '#F9751C',
//   icon: <CustomIcon />
// }

export default function CompanyProgress({ title = "Company Progress", data = [], series = [] }) {
  return (
    <>
      <h3 className="text-base sm:text-lg font-medium ms-16 md-ms-16 text-gray-900 flex items-center gap-2">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.9997 31.1667C24.8239 31.1667 31.1663 24.8243 31.1663 17C31.1663 9.17579 24.8239 2.83337 16.9997 2.83337C9.17542 2.83337 2.83301 9.17579 2.83301 17C2.83301 24.8243 9.17542 31.1667 16.9997 31.1667Z" stroke="#1A3D65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17.0107 14.8864C16.4472 14.8864 15.9067 15.1103 15.5081 15.5088C15.1096 15.9073 14.8857 16.4478 14.8857 17.0114C14.8857 17.575 15.1096 18.1155 15.5081 18.514C15.9067 18.9125 16.4472 19.1364 17.0107 19.1364C17.5743 19.1364 18.1148 18.9125 18.5133 18.514C18.9119 18.1155 19.1357 17.575 19.1357 17.0114C19.1357 16.4478 18.9119 15.9073 18.5133 15.5088C18.1148 15.1103 17.5743 14.8864 17.0107 14.8864ZM17.0107 14.8864V9.91675M21.2707 21.2784L18.5096 18.5187" stroke="#204C80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className='text-primaryBlue font-normal text-2xl'>{title}</span>
      </h3>

      <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-5xl mx-auto mt-4">
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem' }} />

              {/* خطوط البيانات */}
              {series.map(({ key, color }, idx) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  strokeWidth={1.5}
                  dot={{
                    fill: "#fff",
                    stroke: color,
                    strokeWidth: 1,
                    r: 5,
                    style: { filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }
                  }}
                  activeDot={{
                    r: 7,
                    fill: "#fff",
                    stroke: color,
                    strokeWidth: 2,
                    style: { filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend (الشرح) */}
        <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
          {series.map(({ key, label, color, icon }) => (
            <div key={key} className="flex items-center gap-2">
              {icon}
              <span className="text-sm font-semibold" style={{ color }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
