'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '@/store/tasksSlice';
import { LocalTask } from '@/types/task';

interface TaskFormProps {
    onClose: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    function handleSubmit() {
        if (!title.trim()) {
            setError('Title is required.');
            return;
        }
        if (title.trim().length < 3) {
            setError('Title must be at least 3 characters.');
            return;
        }

        dispatch(addTask({
            title: title.trim(),
            completed: false,
            userId: 0,
            isLocal: true,
        }));
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">New Task</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (error) setError('');
                        }}
                        placeholder="Enter task title..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && (
                        <p className="mt-1 text-xs text-red-600">{error}</p>
                    )}
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
}