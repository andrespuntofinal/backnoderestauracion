import { Category, ICategoryRepository } from '../../../domain';
import { CategoryModel } from '../models';

export class CategoryRepository implements ICategoryRepository {
  async findAll(): Promise<Category[]> {
    const categories = await CategoryModel.find().lean();
    return categories.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Category | null> {
    const category = await CategoryModel.findById(id).lean();
    return category ? this.mapToEntity(category) : null;
  }

  async findByType(type: 'Ingreso' | 'Gasto'): Promise<Category[]> {
    const categories = await CategoryModel.find({ type }).lean();
    return categories.map(this.mapToEntity);
  }

  async create(category: Category): Promise<Category> {
    const categoryModel = new CategoryModel({
      name: category.name,
      type: category.type,
    });

    const savedCategory = await categoryModel.save();
    return this.mapToEntity(savedCategory.toObject());
  }

  async update(id: string, category: Partial<Category>): Promise<Category | null> {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      {
        name: category.name,
        type: category.type,
      },
      { new: true }
    ).lean();

    return updatedCategory ? this.mapToEntity(updatedCategory) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await CategoryModel.findByIdAndDelete(id);
    return result !== null;
  }

  private mapToEntity(doc: any): Category {
    return new Category({
      id: doc._id?.toString(),
      name: doc.name,
      type: doc.type,
      createdAt: doc.createdAt,
    });
  }
}