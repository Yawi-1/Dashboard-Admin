import React, { useState } from 'react';
import { Bell, Pin } from 'lucide-react';

const NoticeBoard = () => {
  const [notices] = useState([
    {
      id: 1,
      title: "Upcoming Maintenance Schedule",
      description: "System maintenance will be performed this weekend. Please save your work and log out by Friday 5 PM.",
      date: "2025-01-24",
      isPinned: true
    },
    {
      id: 2,
      title: "New Feature Release",
      description: "We're excited to announce the launch of our new dashboard features. Check out the documentation for more details.",
      date: "2025-01-22",
      isPinned: true
    },
    {
      id: 3,
      title: "Team Meeting",
      description: "Monthly team meeting scheduled for next Monday at 10 AM in the main conference room.",
      date: "2025-01-21",
      isPinned: false
    }
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notice Board</h1>
          <p className="text-gray-500 mt-1">Stay updated with the latest announcements</p>
        </div>
        <Bell className="h-6 w-6 text-gray-500" />
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div 
            key={notice.id} 
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {notice.isPinned && (
                    <Pin className="h-4 w-4 text-blue-500" />
                  )}
                  {notice.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Posted on {new Date(notice.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mt-3">{notice.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;