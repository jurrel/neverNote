"""empty message

Revision ID: 9a7393e213b7
Revises: 995b7c118507
Create Date: 2021-09-25 21:29:30.875398

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '9a7393e213b7'
down_revision = '995b7c118507'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('notes', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('notes', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('notes', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('notes', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    # ### end Alembic commands ###
