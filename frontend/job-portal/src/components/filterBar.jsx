function FilterBar({ filters, onFilterChange }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-wrap gap-4">
            <select name="job_type" value={filters.job_type} onChange={onFilterChange} className="border rounded-lg px-3 py-2">
                <option value="">All Job Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
            </select>

            <select name="location" value={filters.location} onChange={onFilterChange} className="border rounded-lg px-3 py-2">
                <option value="">All Locations</option>
                <option value="Bhubaneswar">Bhubaneswar</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
            </select>
        </div>
    );
}

export default FilterBar;