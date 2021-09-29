"""empty message

Revision ID: de3b4d9062db
Revises: 9a7393e213b7
Create Date: 2021-09-28 23:22:07.100897

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'de3b4d9062db'
down_revision = '9a7393e213b7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('notebooks', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('notebooks', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('notes', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('notes', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('notes', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('notes', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('notebooks', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('notebooks', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    # ### end Alembic commands ###
