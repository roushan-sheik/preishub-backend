/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query, FilterQuery } from "mongoose";

interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  private originalQuery: FilterQuery<T>; // Store original filter

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
    this.originalQuery = { ...modelQuery.getFilter() }; // Store original filter
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    // Excluding fields
    const excludeFields = ["search", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.modelQuery = this.modelQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    const sort =
      (this.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as any);
    return this;
  }

  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // Add countTotal method
  async countTotal(): Promise<IMeta> {
    // Create a new query with the same filters but without pagination
    const countQuery = this.modelQuery.model.find();

    // Apply search filter if exists
    const searchTerm = this.query?.search;
    if (searchTerm) {
      const searchableFields = [
        "title",
        "brand",
        "description",
        "type",
        "name",
      ]; // Add all possible searchable fields
      countQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }

    // Apply other filters
    const queryObj = { ...this.query };
    const excludeFields = ["search", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    countQuery.find(JSON.parse(queryStr));

    // Get total count
    const totalPromise = countQuery.countDocuments();

    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const total = await totalPromise;

    return {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    };
  }
}

export default QueryBuilder;
