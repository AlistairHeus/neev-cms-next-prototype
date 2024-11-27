
'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { dummyAssessments } from '@/types/question-groups';  // Ensure dummyAssessments includes name, medium, and id

const Review = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('thumbnail'); // 'table' or 'thumbnail'
    const pageSize = 10; // Number of items per page

    const filteredAssessments = dummyAssessments.filter(
        (assessment) =>
            assessment.createdBy.toLowerCase().includes(search.toLowerCase()) ||
            assessment.status.toLowerCase().includes(search.toLowerCase()) ||
            assessment.name.toLowerCase().includes(search.toLowerCase()) ||
            assessment.medium.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedAssessments = filteredAssessments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const totalPages = Math.ceil(filteredAssessments.length / pageSize);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-4 w-full min-h-screen">
            {/* Toggle View Button */}
            <div className="flex justify-between mb-4">
                <Input
                    placeholder="Search by createdBy, status, name, or medium"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/2"
                />
                <Button onClick={() => setViewMode(viewMode === 'table' ? 'thumbnail' : 'table')}>
                    Toggle to {viewMode === 'table' ? 'Thumbnail' : 'Table'} View
                </Button>
            </div>

            {/* Table View */}
            {viewMode === 'table' && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Medium</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead>Reviewers</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Question Groups</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedAssessments.map((assessment) => (
                            <TableRow key={assessment.id}>
                                <TableCell>{assessment.id}</TableCell>
                                <TableCell>{assessment.name}</TableCell>
                                <TableCell>{assessment.medium}</TableCell>
                                <TableCell>{assessment.createdBy}</TableCell>
                                <TableCell>{assessment.reviewers.join(', ')}</TableCell>
                                <TableCell>{assessment.status}</TableCell>
                                <TableCell>{assessment.questionGroups.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                {/* Custom Pagination */}
                                <div className="flex justify-between space-x-2 items-center">
                                    <Button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <span>Page {currentPage} of {totalPages}</span>
                                    <Button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            )}

            {/* Thumbnail View */}
            {viewMode === 'thumbnail' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {paginatedAssessments.map((assessment) => (
                        <div key={assessment.id} className="border w-full rounded-lg p-4 flex flex-col relative">
                            {/* Status Pill */}
                            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-white text-xs ${assessment.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'
                                }`}>
                                {assessment.status}
                            </div>

                            <img
                                src="/placeholder-image.jpg"
                                alt={assessment.name}
                                className="w-full h-48 object-cover mb-4 bg-gray-500 border"
                            />
                            <div className="">
                                <p><strong>ID:</strong> {assessment.id}</p>
                                <p><strong>Name:</strong> {assessment.name}</p>
                                <p><strong>Medium:</strong> {assessment.medium}</p>
                                <p><strong>Created By:</strong> {assessment.createdBy}</p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex justify-between mt-auto space-x-2 pt-2">
                                <Button className="w-full" variant="secondary">
                                    Edit
                                </Button>
                                <Button className="w-full" variant="secondary">
                                    Translate
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Review;
