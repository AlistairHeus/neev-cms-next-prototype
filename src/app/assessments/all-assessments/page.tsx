'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { dummyAssessments } from '@/types/question-groups';  // Ensure dummyAssessments includes name, medium, and id


const AllAssessments = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className="p-4 w-full min-h-screen border-2">
      {/* Search Input */}
      <Input
        placeholder="Search by createdBy, status, name, or medium"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {/* Table for assessments */}
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
    </div>
  );
};

export default AllAssessments;
